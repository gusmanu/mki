<?php

namespace App\Controllers;

class Home extends BaseController
{
    protected $auth, $user;

    public function __construct()
    {
        $this->auth = service('authentication');
        $this->user = $this->auth->user();
    }
    public function index()
    {
        return view('welcome_message', ['user' => $this->user]);
    }
}
