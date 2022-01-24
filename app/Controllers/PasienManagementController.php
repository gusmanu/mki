<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;
use Irsyadulibad\DataTables\DataTables;

class PasienManagementController extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        return view('manage');
    }

    public function delete()
    {
        $rules = [
            'ids' => 'required',
            'ids.*' => 'required|is_natural_no_zero',
        ];
        if (!$this->validate($rules)) {
            $noKeyErrors = $this->remove_array_keys($this->validator->getErrors());
            return $this->fail($noKeyErrors[0], 422);
        }
        $userModel = new UserModel();
        $userModel->whereIn('id', $this->request->getPost('ids'))->delete();
        return $this->respondDeleted(['pasien deleted']);
    }

    public function json()
    {
        return DataTables::use('users')
            ->addColumn('checkbox', function ($data) {
                return '<div class="custom-checkbox custom-control">
                            <input type="checkbox" onChange="myCheckFunction(this)" data-id="' . $data->id . '" data-checkboxes="mygroup" class="custom-control-input" id="checkbox-' . $data->id . '">
                            <label for="checkbox-' . $data->id . '" class="custom-control-label">&nbsp;</label>
                        </div>';
            })
            ->rawColumns(['checkbox'])
            ->make(true);
    }

    private function remove_array_keys($array)
    {
        $res = [];
        foreach ($array as $k => $v) {
            $res[] = $v;
        }
        return $res;
    }
}
