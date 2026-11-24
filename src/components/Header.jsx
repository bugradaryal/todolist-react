import logo from '../assets/logo.svg'

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="" width="52" height="52" />
      <div>
        <h1>Yapılacaklar Listesi</h1>
        <p>Görevlerini ekle, düzenle, tamamla. Veriler tarayıcında (localStorage) saklanır.</p>
      </div>
    </header>
  )
}
