const d = require('download')
const { default: axios } = require('axios')

let SKPDSIMDA = [
    {
        "text": "Dinas Pendidikan dan Kebudayaan",
        "value": 1
    },
    {
        "text": "Badan Pengelolaan Keuangan dan Aset Daerah",
        "value": 2
    },
    {
        "text": "Dinas Tenaga Kerja dan Transmigrasi",
        "value": 3
    },
    {
        "text": "Dinas Pemberdayaan Perempuan dan Perlindungan Anak",
        "value": 4
    },
    {
        "text": "Dinas Ketahanan Pangan",
        "value": 5
    },
    {
        "text": "Dinas Lingkungan Hidup",
        "value": 6
    },
    {
        "text": "Dinas Kependudukan dan Pencatatan Sipil",
        "value": 7
    },
    {
        "text": "Dinas Pemberdayaan Masyarakat dan Pemerintah Desa",
        "value": 8
    },
    {
        "text": "Dinas Pengendalian Penduduk dan Keluarga Berencana",
        "value": 9
    },
    {
        "text": "Dinas Perhubungan",
        "value": 10
    },
    {
        "text": "Dinas Komunikasi dan Informatika",
        "value": 11
    },
    {
        "text": "Dinas Koperasi Usaha Kecil dan Menengah",
        "value": 12
    },
    {
        "text": "Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu",
        "value": 13
    },
    {
        "text": "Dinas Pemuda dan Olahraga",
        "value": 14
    },
    {
        "text": "Dinas Perumahan dan Kawasan Pemukiman",
        "value": 16
    },
    {
        "text": "Satuan PNF Sanggar Kegiatan Belajar",
        "value": 17
    },
    {
        "text": "Dinas Pekerjaan Umum dan Penataan Ruang",
        "value": 18
    },
    {
        "text": "Dinas Satuan Polisi Pamong Praja",
        "value": 19
    },
    {
        "text": "Badan Penanggulangan Bencana Daerah",
        "value": 20
    },
    {
        "text": "Dinas Sosial",
        "value": 21
    },
    {
        "text": "Dinas Perpustakaan dan Arsip Daerah",
        "value": 22
    },
    {
        "text": "Dinas Perikanan",
        "value": 23
    },
    {
        "text": "Dinas Pariwisata",
        "value": 24
    },
    {
        "text": "Dinas Pertanian",
        "value": 25
    },
    {
        "text": "Dinas Perindustrian dan Perdagangan",
        "value": 26
    },
    {
        "text": "Sekretariat DPRD",
        "value": 27
    },
    {
        "text": "Badan Pengelolaan Pendapatan Daerah",
        "value": 28
    },
    {
        "text": "Badan Kepegawaian dan Pengembangan Sumber Daya Manusia",
        "value": 29
    },
    {
        "text": "Badan Perencanaan Pembangunan Daerah",
        "value": 30
    },
    {
        "text": "Inspektorat Daerah",
        "value": 31
    },
    {
        "text": "Kecamatan Namlea",
        "value": 32
    },
    {
        "text": "Kecamatan Air Buaya",
        "value": 33
    },
    {
        "text": "Kecamatan Batabual",
        "value": 34
    },
    {
        "text": "Kecamatan Waeapo",
        "value": 35
    },
    {
        "text": "Kecamatan Waplau",
        "value": 36
    },
    {
        "text": "Kecamatan Lolong Guba",
        "value": 37
    },
    {
        "text": "Kecamatan Waelata",
        "value": 38
    },
    {
        "text": "Kecamatan Fena Leisela",
        "value": 39
    },
    {
        "text": "Kecamatan Kaiely",
        "value": 40
    },
    {
        "text": "Kecamatan Lilialy",
        "value": 41
    },
    {
        "text": "Badan Bina Kesatuan Bangsa dan Politik",
        "value": 42
    },
    {
        "text": "Dinas Kesehatan",
        "value": 43
    },
    {
        "text": "Rumah Sakit Umum Daerah Namlea",
        "value": 44
    },
    {
        "text": "Sekretariat Daerah",
        "value": 45
    },
    {
        "text": "Bagian Tata Pemerintahan",
        "value": 47
    },
    {
        "text": "Bagian Hukum",
        "value": 48
    },
    {
        "text": "Bagian Umum dan Perlengkapan",
        "value": 49
    },
    {
        "text": "Bagian Organisasi",
        "value": 50
    },
    {
        "text": "Bagian Hubungan Masyarakat dan Protokol",
        "value": 51
    },
    {
        "text": "Bagian Ekonomi dan Pembangunan",
        "value": 52
    },
    {
        "text": "Bagian Kesejahteraan Rakyat",
        "value": 53
    },
    {
        "text": "Bagian Sumber Daya Alam",
        "value": 54
    },
    {
        "text": "Bagian Keuangan dan Perencanaan",
        "value": 55
    }
]

// link.href = `https://fmis.bpkp.go.id/s2/burukab/penatausahaan/laporan-skpd/bend-pengeluaran/bend-pengeluaran/cetak?kd_laporan=4&tgl_laporan=2022-01-01&idskpd=&tgl_range=2022-01-01%20-%202022-12-31&tgl_1=2022-01-01&tgl_2=2022-12-31&idunit=${kode}&idsubunit=${kode}&footer=`

SKPDSIMDA.forEach((x) => {
    let link = document.createElement('a')
    let kode = x.value;
    let nama = x.text
    link.href = `https://fmis.bpkp.go.id/s2/burukab/anggaran/cetak-laporan2/rptskpdarsip?_token=eRLF8RWmKo7HaFnRr1yq3LxnaedcLR1WxSWLZXHi&jenis_laporan=5&tahun=2022&idjnsdokumen=28&norevisi=1&idskpd=${kode}&idunit=${kode}&idprogram=208&idkegiatan=540&idsubkegiatan=2610&tgl_ttd=2022-12-27&type=pdf&btnsubmit=`;
    link.download = nama;
    link.dispatchEvent(new MouseEvent('click'));
});

const instance = axios.create({
})

const download = async(SKPDSIMDA) => {
    let options = {}

    options.filename = "Dinas Pendidikan dan Kebudayaan.pdf"
    await d(
        "https://fmis.bpkp.go.id/s2/burukab/anggaran/cetak-laporan2/rptskpdarsip?_token=oX9lzg4GnbFmc9L7pKrJq30PEDRitTFpO3PB3g20&jenis_laporan=5&tahun=2022&idjnsdokumen=28&norevisi=1&idskpd=1&idunit=1&idprogram=208&idkegiatan=540&idsubkegiatan=2610&tgl_ttd=2022-12-20&type=pdf&btnsubmit=",
        "H:\\Other computers\\My laptop\\Work\\Anggaran\\APBD\\2022\\PAGU\\PERUBAHAN\\SIMDA",
        options
    )
} 

download()