﻿namespace BuisnessLogicLayer.Models
{
    /// <summary>
    ///   Describes a roleModel
    /// </summary>
    public class RoleModel
    {
        /// <summary>Gets or sets the identifier.</summary>
        /// <value>The identifier.</value>
        public int Id { get; set; }

        /// <summary>Gets or sets the name.</summary>
        /// <value>The name.</value>
        public string Name { get; set; }

        /// <summary>Gets or sets the name of the normalized.</summary>
        /// <value>The name of the normalized.</value>
        public string NormalizedName { get; set; }
    }
}
