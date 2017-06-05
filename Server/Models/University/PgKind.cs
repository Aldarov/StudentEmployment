﻿using System;
using System.Collections.Generic;

namespace Server.Models.University
{
    public partial class PgKind
    {
        public PgKind()
        {
            PgHeaders = new HashSet<PgHeader>();
            PgTypes = new HashSet<PgType>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<PgHeader> PgHeaders { get; set; }
        public virtual ICollection<PgType> PgTypes { get; set; }
    }
}
