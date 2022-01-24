<?php

namespace App\Controllers\API;

use App\Controllers\BaseController;
use Carbon\Carbon;
use CodeIgniter\API\ResponseTrait;

class HphtController extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $json = $this->request->getJSON();
        if (empty($json) or is_null($json) or !isset($json->LMT) or strlen($json->LMT) < 1) {
            return $this->failValidationErrors(['error' => 'data input tidak valid']);
        }

        try {
            $lmt = Carbon::createFromFormat('d/m/Y', $json->LMT, 'Asia/Jakarta');
        } catch (\Exception $e) {
            return $this->failValidationErrors(['error' => 'data input LMT tidak valid']);
        }

        $diffFromNow = Carbon::now()->setTimezone('Asia/Jakarta')->diffInDays($lmt, false);
        if ($diffFromNow > 0) {
            return $this->failValidationErrors(['error' => 'data input LMT harus tanggal lampau atau sama dengan hari ini']);
        }
        if ($diffFromNow < -240) {
            return $this->failValidationErrors(['error' => 'data input LMT tidak boleh lebih 240 Hari dari sekarang']);
        }

        $GA = abs($diffFromNow);
        $Gr = $GA * 16 - $GA;
        $days = $GA % 7;
        $weeks = ceil(($GA - $days) / $GA);
        $strTime = '';
        if ($weeks > 0) {
            $strTime .= $weeks . ' Minggu,';
        }
        if ($days > 0) {
            $strTime .= $days . ' Hari';
        }
        return $this->respond(['EDD' => $lmt->addDays(240)->format('d/m/Y'), 'GA' => $strTime, 'Gr' => $Gr]);
    }
}
