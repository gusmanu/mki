<?php

namespace App\Controllers\API;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;


class NkiController extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $json = $this->request->getJSON();
        if (empty($json) or is_null($json) or !isset($json->NO) or strlen($json->NO) < 1) {
            return $this->failValidationErrors(['error' => 'data input NO tidak valid']);
        }

        if (strlen($json->NO) < 10 or strlen($json->NO) > 14) {
            return $this->failValidationErrors(['error' => 'data input NO min 10 angka dan max 14 angka']);
        }

        $no = (string) $json->NO;
        if (preg_match('/^\+62/', $no)) {
            $no = preg_replace('/^\+62/', '0', $no);
        } else if (preg_match('/^62/', $no)) {
            $no = preg_replace('/^62/', '0', $no);
        }

        $prefix = substr($no, 0, 4);
        $validPrefix = ['0859', '0877', '0878', '0818', '0819', '0821', '0822', '0823', '0852', '0813', '0811', '0812', '0853', '0851', '0898', '0899', '0895', '0896', '0897', '0814', '0815', '0816', '0855', '0856', '0857', '0858', '0889', '0881', '0882', '0883', '0886', '0887', '0888', '0884', '0885', '0828', '0868', '0838', '0832', '0833', '0838', '0831'];

        if (in_array($prefix, $validPrefix)) {
            return $this->respond(['nomor anda valid']);
        } else {
            return $this->respond(['nomor anda tidak valid']);
        }
    }
}
