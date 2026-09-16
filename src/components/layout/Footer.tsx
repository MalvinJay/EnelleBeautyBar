export function Footer() {
    return (
        <footer className="bg-ink px-5 pb-24 pt-8 text-porcelain/60 sm:px-10 lg:px-16">
            <div className="mx-auto flex max-w-[1400px] flex-col justify-center gap-5 border-t border-porcelain/15 pt-7 text-[10px] font-semibold uppercase tracking-[0.14em] sm:flex-row">
                <span>© {new Date().getFullYear()} Enelle Beauty Bar · 25 Pawpaw Street, Agbogba, Accra</span>
                |
                <a href="https://www.instagram.com/enelle_beauty_bar/" target="_blank" rel="noreferrer" className="transition hover:text-champagne">Instagram</a>
            </div>
        </footer>
    )
}
