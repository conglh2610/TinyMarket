namespace Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class conglh : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Posts", "Name", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Posts", "Name");
        }
    }
}
