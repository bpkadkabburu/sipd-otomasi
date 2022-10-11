const {
    TAHUN_ANGGARAN,
    ID_DAERAH,
    NAMA_JADWAL,
    PATH_DPA
} = require('../config')

const {
    cookieList,
    httpsAgent
} = require('../utils.js')
const axios = require('axios')
const axiosRetry = require('axios-retry')

const instance = axios.create({
    headers:{
        Cookie:cookieList('siap_session', 'cookies.json')
    },
    timeout:60000,
    httpsAgent: httpsAgent()
})

axiosRetry(instance, { retries: 4})

const BASE_URL = 'https://burukab.sipd.kemendagri.go.id/siap'

module.exports = {
    ax:instance,
    BASE_URL,
    LINKS:{
        RAK:{
            BELANJA:`${BASE_URL}/rak-belanja/tampil-unit/daerah/main/budget/${TAHUN_ANGGARAN}/${ID_DAERAH}/`
        },
        PENGATURAN:{
            JADWAL:`${BASE_URL}/jadwal/tampil-jadwal`
        },
        DPA:{
            BELANJA:`${BASE_URL}/dpa-bl/tampil-unit/daerah/main/budget/${TAHUN_ANGGARAN}/${ID_DAERAH}/`,
            DEPAN:`${BASE_URL}/halaman-depan-dpa/tampil-unit/daerah/main/budget/${TAHUN_ANGGARAN}/${ID_DAERAH}/`,
            PEMBIAYAAN:`${BASE_URL}/dpa-biaya/tampil-unit/daerah/main/budget/${TAHUN_ANGGARAN}/${ID_DAERAH}/`,
            PENDAPATAN:`${BASE_URL}/dpa-penda/tampil-unit/daerah/main/budget/${TAHUN_ANGGARAN}/${ID_DAERAH}/`,
            PERSETUJUANDEPAN: `${BASE_URL}/halaman-persetujuan-dpa/tampil-unit/daerah/main/budget/${TAHUN_ANGGARAN}/${ID_DAERAH}/`,
            RINCIANBELANJA:`${BASE_URL}/dpa-bl-rinci/tampil-unit/daerah/main/budget/${TAHUN_ANGGARAN}/${ID_DAERAH}/`,
            RINCIANBELANJASKPD:`${BASE_URL}/dpa-bl-rinci/tampil-giat/daerah/main/budget/${TAHUN_ANGGARAN}/${ID_DAERAH}/`,
            SKPD:`${BASE_URL}/dpa-skpd/tampil-unit`,
            HISTJADWAL:`${BASE_URL}/jadwal/${TAHUN_ANGGARAN}/hist-jadwal-dpa/${ID_DAERAH}`,
            SETTINGTANGGAL:`${BASE_URL}/cetak-dpa/setting-link/daerah/main/budget/${TAHUN_ANGGARAN}/${ID_DAERAH}`
        },
        DEPAN:{
            HOME:`${BASE_URL}/home`,
            LOGIN: BASE_URL
        }
    },
    PATH:{
        DPA:{
            UTAMA:`${PATH_DPA}\\${NAMA_JADWAL}`,
            JSON:`${PATH_DPA}\\${NAMA_JADWAL}\\JSON`,
            BELANJA:`${PATH_DPA}\\${NAMA_JADWAL}\\5. DPA Belanja`,
            DEPAN:`${PATH_DPA}\\${NAMA_JADWAL}\\2. Halaman Depan`,
            PEMBIAYAAN:`${PATH_DPA}\\${NAMA_JADWAL}\\7. Pembiayaan`,
            PENDAPATAN:`${PATH_DPA}\\${NAMA_JADWAL}\\4. DPA Pendapatan`,
            PERSETUJUANDEPAN: `${PATH_DPA}\\${NAMA_JADWAL}\\1. Halaman Persetujuan`,
            RINCIANBELANJA:`${PATH_DPA}\\${NAMA_JADWAL}\\6. DPA Rincian Belanja`,
            SKPD:`${PATH_DPA}\\${NAMA_JADWAL}\\3. DPA SKPD`,
        }
    }
}