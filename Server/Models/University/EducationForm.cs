﻿using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Server.Models.University
{
    public partial class EducationForm
    {
        public EducationForm()
        {
            PgHeaders = new HashSet<PgHeader>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        
        [JsonIgnore]
        public virtual ICollection<PgHeader> PgHeaders { get; set; }
    }
}
