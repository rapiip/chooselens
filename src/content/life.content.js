import { contactLinks } from './site.config'

export const lifeContent = {
  hero: {
    name: 'Rafif Alton',
    tagline:
      'Mahasiswa informatika di Balikpapan yang belajar cara dunia bekerja, dari blockchain sampai geopolitik.',
    ctas: [
      { label: 'Baca Cerita Saya', href: '#about' },
      { label: 'Kirim Surat', href: contactLinks.email },
    ],
  },
  about: {
    title: 'Tentang Saya',
    paragraphs: [
      'Saya tertarik pada teknologi bukan hanya karena bisa dibangun, tapi karena ia mengubah cara orang mengambil keputusan. Kadang rasa penasarannya membawa saya ke protokol DeFi, kadang ke keamanan sistem, kadang ke pertanyaan yang lebih besar seperti kenapa satu keputusan bank sentral bisa terasa sampai ke kota seperti Balikpapan.',
      'Saya belajar paling efektif ketika suasananya tenang dan ada cukup ruang untuk berpikir pelan. Karena itu persona ini dibuat lebih seperti jurnal editorial daripada resume. Ia tidak berusaha terdengar paling impressive, tapi ingin terasa paling jujur.',
    ],
  },
  journalEntries: [
    {
      date: 'Okt 2025',
      title: 'Mulai serius belajar DeFi',
      reflection:
        'Awalnya tertarik pada yield farming, lalu pelan-pelan justru masuk ke tokenomics, struktur insentif, dan bagaimana likuiditas berpindah.',
    },
    {
      date: 'Jan 2026',
      title: 'Membaca keamanan dengan lebih sabar',
      reflection:
        'Semakin sering melihat sistem, semakin terasa bahwa detail kecil sering menentukan apakah sesuatu aman atau hanya terlihat rapi.',
    },
    {
      date: 'Apr 2026',
      title: 'Mencoba menulis portofolio yang terasa seperti pengalaman',
      reflection:
        'Saya ingin website yang tidak memaksa semua orang melihat versi saya yang sama, karena kenyataannya konteks memang mengubah cara orang membaca kita.',
    },
  ],
  quotes: [
    'Saya lebih tertarik pada kenapa sesuatu terjadi daripada sekadar bagaimana cara membuatnya.',
    'Rasa ingin tahu sering terasa tidak efisien, tapi biasanya di situlah arah belajar yang paling jujur muncul.',
    'Teknologi menarik ketika ia bertemu manusia, kebiasaan, dan konsekuensi nyata.',
  ],
  obsessions: [
    {
      topic: 'Macroeconomics',
      reason: 'Saya suka melihat bagaimana keputusan abstrak di level global bisa terasa sangat konkret di kehidupan sehari-hari.',
      resource: 'Newsletter dan thread analisis kebijakan moneter',
    },
    {
      topic: 'Geopolitics',
      reason: 'Ia memberi konteks yang lebih luas untuk memahami pasar, teknologi, dan arah kebijakan.',
      resource: 'Long-form essays dan explainer regional',
    },
    {
      topic: 'DeFi Mechanics',
      reason: 'Saya tertarik pada desain insentif dan kenapa sebagian sistem terasa sehat sementara yang lain rapuh.',
      resource: 'Protocol docs dan governance discussions',
    },
  ],
  interests: ['Financial markets', 'Decentralized governance', 'Pola belajar', 'Essay panjang', 'Systems thinking'],
  contact: {
    title: 'Kirim Surat',
    intro: 'Tidak perlu formal. Pilih jalur yang terasa paling natural.',
    actions: [
      { label: 'Email', href: contactLinks.email },
      { label: 'LinkedIn', href: contactLinks.linkedin },
      { label: 'GitHub', href: contactLinks.github },
    ],
  },
}
