using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Auth;
using Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;
using System.Xml.Linq;
using System.Threading.Tasks;
using System.IO;
using Server.Models.University;

namespace Server.Controllers
{
    public class AccountController : Controller
    {
        private UniversityContext db;
        private IJwt jwt;

        public AccountController(UniversityContext context, IJwt token)
        {
            jwt = token;
            db = context;
        }

        private ClaimsIdentity GetClaimsIdentity(string employmentId)
        {
            var claims = new List<Claim>
                {
                    new Claim("EmploymentId", employmentId)
                };
            ClaimsIdentity identity = new ClaimsIdentity(claims, "Token");
            return identity;
        }

        [HttpPost("api/login")]
        public async Task<ActionResult> Login([FromBody]AuthProps props)
        {
            string sessionId = props != null ? props.SessionId : null;
            if (sessionId == null)
            {
                return BadRequest("Необходимо авторизоваться");
            }

            Http­Client  client = new Http­Client ();
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/xml"));
            var response = client.GetAsync("http://my.bsu.ru/auth.php?id=" + sessionId).Result;
            if (response.IsSuccessStatusCode)
            {
                var stringAuth = await response.Content.ReadAsStringAsync();
                XDocument xdoc = XDocument.Parse(stringAuth);
                XElement res = xdoc.Descendants("result").FirstOrDefault();
                if (res != null)
                {
                    string state = res.Attributes().Where(q => q.Name == "state").Select(q => q.Value).FirstOrDefault();
                    if (state == "1")
                    {
                        var check = db.Placements
                            .FromSql<Placement>("select * from dbo.pg_access_to_specialities({0})", props.EmploymentId)
                            .Any();
                        if (check)
                        {
                            var identity = GetClaimsIdentity(props.EmploymentId);
                            return Ok(jwt.GetToken(identity));
                        }
                        else
                        {
                            return BadRequest("Ваше подразделение не добавлено в список разрешенных, обратитесь в ЦИТиДО");
                        }
                    }
                    else
                        return StatusCode(403, Json("Access denied"));
                }
            }
            return Unauthorized();
        }

        [HttpPost("api/token")]
        public IActionResult RefreshToken([FromBody]Token token)
        {
            var refresh_token = token.refresh_token;
            if (refresh_token == null)
            {
                return BadRequest();
            }

            try
            {
                ClaimsPrincipal principal = jwt.DecodeToken(refresh_token);
                string employmentId = principal.FindFirst("EmploymentId").Value;

                var identity = GetClaimsIdentity(employmentId);
                Token newToken = jwt.GetToken(identity);
                return Ok(newToken);
            }
            catch
            {
                return StatusCode(403, Json("Invalid refresh token"));
            }
        }

    }
}
