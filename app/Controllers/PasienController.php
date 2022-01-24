<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Entities\User;
use App\Models\UserModel;
use Carbon\Carbon;

class PasienController extends BaseController
{
    public function index()
    {
        return view('auth/register');
    }

    public function register()
    {
        // Validate basics first since some password rules rely on these fields
        $rules = [
            'name'  => 'required|alpha_space|min_length[6]|max_length[16]',
            'email'     => 'required|valid_email|is_unique[users.email]',
            'phone' => 'required|numeric|min_length[10]|max_length[14]',
            'hpht'  => 'required|string|min_length[10]'
        ];

        if (!$this->validate($rules)) {
            return redirect()->back()->withInput()->with('errors', $this->validator->getErrors());
        }

        try {
            $test =  Carbon::createFromFormat('d/m/Y', $this->request->getPost('hpht'))->toDateString();
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('errors', ['hpht' => 'tanggal tidak valid']);
        }

        // Validate passwords since they can only be validated properly here
        $rules = [
            'password'     => 'required|strong_password',
            'pass_confirm' => 'required|matches[password]',
        ];

        if (!$this->validate($rules)) {
            return redirect()->back()->withInput()->with('errors', $this->validator->getErrors());
        }

        $user = new User();
        $userModel = new UserModel();
        $auth = service('authentication');
        $user->fill([
            'email' => $this->request->getPost('email'),
            'username' => uniqid(),
            'phone' => $this->request->getPost('email'),
            'hpht' => $this->request->getPost('hpht'),
            'name' => $this->request->getPost('name'),
            'password' => $this->request->getPost('password'),
            'active' => true,
        ]);

        $insertUser = $userModel->insert($user, true);
        $auth->loginById($insertUser, true);
        return redirect()->to('/home')->withCookies();
    }

    public function logout()
    {
        $auth = service('authentication');
        if ($auth->check()) {
            $auth->logout();
        }
        return redirect()->to('/')->withCookies();
    }
}
