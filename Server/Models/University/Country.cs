using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Server.Models.University
{
    public partial class Country
    {
        public Country()
        {
            JuridicalPersons = new HashSet<JuridicalPerson>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        public virtual ICollection<JuridicalPerson> JuridicalPersons { get; set; }
    }
}