# terapia-demo

Demonstracyjna wersja strony gabinetu psychoterapii (psychoterapia dorosłych, diagnostyka ADHD u dorosłych, konsultacje rodzicielskie). Statyczne HTML + CSS + JS, bez bundlera, bez frameworka, bez skryptów śledzących. Wszystkie dane osobowe, kontaktowe i cenowe są placeholderami w nawiasach kwadratowych.

Demo powstało jako propozycja nowej wersji istniejącej strony (www.terapianafotelu.pl). Nie zawiera tekstów, zdjęć ani logo z oryginału.

## Wdrożenie na Vercel w 3 krokach

1. Wejdź na [vercel.com/new](https://vercel.com/new) i zaimportuj to repozytorium z GitHuba.
2. Zostaw ustawienia domyślne: **Framework Preset: Other**, bez komendy build, Output Directory puste (pliki leżą w katalogu głównym).
3. Kliknij **Deploy**. Po chwili dostaniesz adres `*.vercel.app`. Każdy push na `main` wdraża nową wersję automatycznie.

Strona ma znacznik `noindex`, więc wyszukiwarki jej nie zaindeksują i nie będzie konkurować z oryginalną domeną. Przed produkcyjnym użyciem usuń linię `<meta name="robots" content="noindex, nofollow">` z każdego pliku HTML.

## Uruchomienie lokalne

Dowolny serwer statyczny, np.:

```
python3 -m http.server 8000
```

i otwórz `http://localhost:8000`.

## Struktura

| Plik | Co zawiera |
|---|---|
| `index.html` | Strona główna: hero, „Dla kogo”, quiz „Czy to dla mnie?”, ścieżka pierwszej wizyty z checklistą, skrót oferty, tabela informacji praktycznych |
| `oferta.html` | Cztery usługi: konsultacja, psychoterapia (CBT, TSR, ACT, terapia schematów), diagnostyka ADHD, konsultacja rodzicielska |
| `diagnostyka-adhd.html` | Oś czasu 3 spotkań diagnostycznych (wywiad, kwestionariusze, DIVA-5, omówienie hipotezy), checklista, FAQ |
| `o-mnie.html` | Jak pracuję, czego nie robię, kwalifikacje (placeholdery) |
| `informacje-praktyczne.html` | Cena, długość sesji, odwołania, formy, płatność, FAQ |
| `rezerwacja.html` | Makieta formularza (nic nie wysyła), „co dalej po wysłaniu”, checklista |
| `kontakt.html` | Dane kontaktowe (placeholdery), dojazd, mapka SVG, numery kryzysowe |
| `wynajem-gabinetu.html` | Osobna podstrona dla specjalistów, link tylko w stopce |
| `polityka-prywatnosci.html` | Szkielet do uzupełnienia |
| `styles.css` | Style, tryb jasny/ciemny, ograniczony ruch, mobile-first |
| `script.js` | Motyw, ruch, nawigacja mobilna, czas czytania, checklisty, quiz, makieta formularza |
| `DESIGN_NOTES.md` | Dlaczego taka struktura i co celowo pominięto |

Formularz rezerwacji obsługuje parametr `?usluga=konsultacja|psychoterapia|adhd|rodzicielska`, który wstępnie zaznacza usługę (używa go quiz).

## Co strona zapisuje w przeglądarce

Tylko dwie preferencje wyglądu w `localStorage`: `demo-theme` (jasny/ciemny) i `demo-motion` (ograniczony ruch). Quiz, checklisty i formularz działają wyłącznie w pamięci strony i znikają po odświeżeniu. Brak cookies, brak analityki. Jedyne zewnętrzne żądania to Google Fonts (Bricolage Grotesque, Inter).

## Lista placeholderów do podmiany

Wyszukaj w plikach `.html` tekst w nawiasach kwadratowych (`grep -o "\[[A-ZĄĆĘŁŃÓŚŹŻ][^]]*\]" *.html | sort -u`). Pełna lista:

### Tożsamość i kontakt
- `[NAZWA GABINETU]` — nagłówek, stopka, tytuły stron (wszystkie pliki)
- `[IMIĘ I NAZWISKO]` — `o-mnie.html`
- `[TYTUŁ ZAWODOWY, np. psychoterapeutka poznawczo-behawioralna]` — `o-mnie.html`
- `[TELEFON]` — `kontakt.html`, `rezerwacja.html`, `wynajem-gabinetu.html`
- `[E-MAIL]` — `kontakt.html`, `rezerwacja.html`, `wynajem-gabinetu.html` (także w `mailto:`), `polityka-prywatnosci.html`
- `[GODZINY ODBIERANIA]` — `kontakt.html`, `rezerwacja.html`
- `[CZAS ODPOWIEDZI]` — `index.html`, `kontakt.html`, `rezerwacja.html`
- `[DNI I GODZINY]` — `kontakt.html`

### Adres i dojazd
- `[ULICA I NUMER]` — stopka (wszystkie pliki), `index.html`, `informacje-praktyczne.html`, `kontakt.html`, `wynajem-gabinetu.html`
- `[PIĘTRO, DOMOFON, WINDA]` — `kontakt.html`
- `[JAK TRAFIĆ: piętro, domofon, parking]` — `informacje-praktyczne.html`
- `[LINIA / STACJA]`, `[X]` (minuty pieszo), `[GDZIE ZAPARKOWAĆ]`, `[WINDA / SCHODY / DOSTĘP DLA WÓZKA]` — `kontakt.html`
- `[GABINET]`, `[ULICA]` — etykiety na mapce SVG w `kontakt.html` (do zastąpienia prawdziwą mapą)
- Miasto „Pruszków” jest wpisane na stałe; zmień, jeśli trzeba.

### Ceny i zasady
- `[CENA]` — cena sesji/konsultacji: `index.html`, `oferta.html`, `informacje-praktyczne.html`
- `[CENA DIAGNOSTYKI]` — pakiet diagnostyki ADHD: `index.html`, `oferta.html`, `diagnostyka-adhd.html`, `informacje-praktyczne.html`
- `[ZASADY ODWOŁAŃ]` — `index.html`, `informacje-praktyczne.html`
- `[FORMY PŁATNOŚCI]` — `index.html`, `informacje-praktyczne.html`
- `[PLATFORMA]` — narzędzie do wideo (np. Google Meet, Zoom): `index.html`, `diagnostyka-adhd.html`, `informacje-praktyczne.html`, `kontakt.html`
- `[LICZBA DNI]` — typowy czas od formularza do pierwszej wizyty: `index.html`
- `[LICZBA]` — co ile sesji przegląd postępów: `oferta.html`
- `[JEŚLI DOTYCZY: SMS lub e-mail]` — przypomnienie dzień wcześniej: `rezerwacja.html`

### O mnie
- `[UCZELNIA, KIERUNEK, ROK]`, `[SZKOŁA PSYCHOTERAPII, NURT, STATUS CERTYFIKACJI]`, `[SZKOLENIE Z DIAGNOSTYKI ADHD / DIVA-5]`, `[INNE KURSY I SZKOLENIA]` — `o-mnie.html`
- `[CZĘSTOTLIWOŚĆ]` (superwizji), `[TOWARZYSTWO / ORGANIZACJA]` (kodeks etyczny) — `o-mnie.html`
- `[OPCJONALNIE: 2–3 zdania od właścicielki …]` — `o-mnie.html`, sekcja „Prywatnie”

### Wynajem gabinetu
- `[CENA ZA GODZINĘ]`, `[CENA ZA DZIEŃ]`, `[DNI I GODZINY DOSTĘPNOŚCI]`, `[INNE WYPOSAŻENIE]`, `[NARZĘDZIE]` (kalendarz rezerwacji), `[X]` (minimalny blok godzin), `[ZASADY ODWOŁAŃ WYNAJMU]`, `[MIESIĘCZNIE / Z GÓRY]` — `wynajem-gabinetu.html`

### RODO
- `[NAZWA ADMINISTRATORA DANYCH]` — `rezerwacja.html`, `polityka-prywatnosci.html`
- `[ADRES]`, `[PODSTAWA PRAWNA]`, `[OKRES PRZECHOWYWANIA]`, `[PROCEDURA KONTAKTU]` — `polityka-prywatnosci.html`

### Do zweryfikowania merytorycznie (nie są placeholderami, ale są założeniami)
- Czasy spotkań diagnostycznych: 90 / 120 / 90 minut (łącznie ok. 5 h) — `diagnostyka-adhd.html`, `informacje-praktyczne.html`
- Podział pierwszego spotkania 10 / 30 / 10 minut — `index.html`, `oferta.html`
- Orientacyjne długości terapii (8–12 spotkań dla krótkich celów) — `oferta.html`
- Przedziały pór dnia w formularzu (8–12, 12–16, 16–20) — `rezerwacja.html`
- Numery kryzysowe (112, 116 123, 800 70 2222) — `index.html`, `kontakt.html`; sprawdź aktualność przed publikacją

## Walidacja

```
npx html-validate *.html
```

Przed publikacją formularz wymaga backendu (np. Vercel Forms, Formspree, własny endpoint) lub zamiany na link `mailto:`.
