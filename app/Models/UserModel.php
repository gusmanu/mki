<?php

namespace App\Models;

use Myth\Auth\Models\UserModel as MythModel;
use App\Entities\User;

class UserModel extends MythModel
{
    protected $returnType = User::class;
    protected $table = 'users';
    protected $primaryKey = 'id';

    protected $useSoftDeletes = false;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';

    protected $allowedFields = [
        'email', 'username', 'name', 'phone', 'hpht', 'password_hash', 'reset_hash', 'reset_at', 'reset_expires', 'activate_hash',
        'status', 'status_message', 'active', 'force_pass_reset', 'permissions',
    ];

    protected $useTimestamps = true;

    protected $validationMessages = [];
    protected $skipValidation = false;

    protected $afterInsert = ['addToGroup'];

    /**
     * The id of a group to assign.
     * Set internally by withGroup.
     *
     * @var int|null
     */
    protected $assignGroup;
}
