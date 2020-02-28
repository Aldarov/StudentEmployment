using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Auth;
using Microsoft.EntityFrameworkCore;
using Server.Models.University;
using Microsoft.AspNetCore.Authorization;
using Server.Infrastructure;
using Server.Services;

namespace Server.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class StudentsController : Controller
    {
        private UniversityContext db;

        public StudentsController(UniversityContext context)
        {
            db = context;
        }

        [HttpGet()]
        public IActionResult GetStudentsByHeader(int year, int educationFormId, int specialityId,
            int? specializationId, int? groupId)
        {
            IQueryable<Student> res;
            if (groupId > 0)
            {
                res = db.Students.Where(q =>
                        q.EducationFormId == educationFormId &&
                        q.GroupId == groupId &&
                        (q.StateId == 1 || q.StateId == 2)
                    )
                    .OrderBy(x => x.FullName)
                    .AsNoTracking();
            }
            else
            {
                res = db.Students.Where(q =>
                        (q.EntranceYear == year || q.EntranceYearByOrder == year) &&
                        q.EducationFormId == educationFormId &&
                        q.SpecialityId == specialityId &&
                        (q.StateId == 1 || q.StateId == 2)
                    )
                    .OrderBy(x => x.FullName)
                    .AsNoTracking();
                if (specializationId > 0)
                    res = res.Where(q => q.SpecializationId == specializationId);
            }

            return Ok(res);
        }

        [HttpGet()]
        public IActionResult GetStudentsWithoutSelected(int year, int educationFormId, int specialityId,
            int? specializationId, int? groupId, List<int> w)
        {
            IQueryable<Student> res;
            if (groupId > 0)
            {
                res = db.Students.Where(q =>
                        q.EducationFormId == educationFormId &&
                        q.GroupId == groupId &&
                        (q.StateId == 1 || q.StateId == 2 || q.StateId == 3) &&
                        !w.Contains(q.StudentId)
                    )
                    .OrderBy(x => x.FullName)
                    .AsNoTracking();
            }
            else
            {
                res = db.Students.Where(q =>
                        (q.EntranceYear == year || q.EntranceYearByOrder == year) &&
                        q.EducationFormId == educationFormId &&
                        q.SpecialityId == specialityId &&
                        (q.StateId == 1 || q.StateId == 2 || q.StateId == 3) &&
                        !w.Contains(q.StudentId)
                    )
                    .OrderBy(x => x.FullName)
                    .AsNoTracking();
                if (specializationId != null && specializationId != 0)
                    res = res.Where(q => q.SpecializationId == specializationId);
            }

            return Ok(res);
        }
    }
}
