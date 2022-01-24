<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddNameToUsersTable extends Migration
{
    public function up()
    {
        $this->forge->addColumn('users', 'name varchar(255) NOT NULL');
        $this->forge->addColumn('users', 'phone varchar(255) NOT NULL');
        $this->forge->addColumn('users', 'hpht varchar(255) NULL');
    }

    public function down()
    {
        $this->forge->dropColumn('users', 'name');
        $this->forge->dropColumn('users', 'phone');
        $this->forge->dropColumn('users', 'hpht');
    }
}
