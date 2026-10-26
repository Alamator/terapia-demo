# DESIGN_NOTES

## Dlaczego taka struktura

Osią strony jest **ścieżka pierwszej wizyty**, nie „o nas”. Osoba, która trafia na stronę terapeuty, ma zwykle jedno pytanie: „co się stanie, jeśli kliknę?”. Dlatego każda podstrona odpowiada na: co, ile trwa, co przygotować, z czym wychodzę. Strona główna prowadzi przez pięć sekcji w kolejności decyzji: *Dla kogo* (czy to o mnie) → *Czy to dla mnie?* (która usługa) → *Ścieżka* (co się wydarzy) → *Oferta* (szczegóły) → *Praktyczne* (ile, gdzie, jak płacę) → jedno wezwanie do działania.

Diagnostyka ADHD ma własną podstronę z osią czasu, bo jest najbardziej złożonym produktem i najczęściej budzi niepewność („ile to trwa?”, „czy to oficjalne?”). Wynajem gabinetu jest poza głównym menu: to inna grupa odbiorców i mieszanie go z terapią osłabia przekaz.

## Co wynika z ADHD (i lęku) u odbiorców

- **TL;DR na początku każdej sekcji** i szacowany czas czytania: osoba z ADHD decyduje w pierwszych sekundach, czy czytać dalej. Dajemy jej to, zanim przewinie.
- **Jedna akcja na ekran**: każda sekcja kończy się jednym wyraźnym przyciskiem, a nie trzema równorzędnymi. Mniej decyzji = mniej paraliżu.
- **Krótkie bloki, listy, tabele**, zero ścian tekstu. Najdłuższy akapit ma trzy zdania.
- **Konkretne sytuacje zamiast diagnoz** w „Dla kogo”: „ciągle zaczynasz i nie kończysz” rozpoznaje się szybciej niż „trudności z funkcjami wykonawczymi”.
- **Quiz 5 pytań** zamiast czytania całej oferty: skraca drogę od „nie wiem, co wybrać” do kliknięcia. Wynik prowadzi do formularza z wybraną już usługą.
- **Checklisty z odhaczaniem** (przed wizytą, przed diagnostyką): zewnętrzna struktura zamiast polegania na pamięci roboczej. Napisane tak, by brak zrobienia nie wywoływał wstydu („dwie odhaczone rzeczy to już dużo”).
- **Czasy wszędzie**: 50 minut, 3 minuty na formularz, 90/120/90 minut diagnostyki. Niepewność czasowa jest dla ADHD realnym kosztem.
- **Przełącznik ograniczonego ruchu i tryb ciemny** w nagłówku, nie w ustawieniach. Respektujemy też preferencje systemowe.
- **Duża typografia** (18 px bazowo), szerokość tekstu do 62 znaków, kontrast AA w obu trybach, widoczny focus, pełna obsługa klawiatury.
- **Normalizacja** „trudnych” zachowań w tekście: odkładanie kwestionariuszy, niezrobione zadania, brak osoby z dzieciństwa. Zmniejsza barierę wejścia.

## Decyzje wizualne

Brak pasteli, brak stockowych foteli i zdjęć. Ciepły papier + atramentowa czerń + jeden mocny akcent (palona pomarańcz) i geometryczny grotesk w nagłówkach. Jedyna grafika to abstrakcyjna linia: plątanina, która przechodzi w prostą ścieżkę z trzema punktami. To metafora całej strony, nie dekoracja.

## Co celowo pominięto

- **Zdjęcia i logo**: prawa autorskie oraz publiczne repozytorium; SVG i CSS wystarczają w demo.
- **Opinie klientów**: w psychoterapii budzą wątpliwości etyczne i rzadko są wiarygodne.
- **Blog / artykuły**: bez regularnego pisania to martwa sekcja, która psuje wrażenie.
- **Skype i inne konkretne narzędzia**: platforma to placeholder, żeby nie zestarzała się w dniu publikacji.
- **Wzmianka o własnym ADHD właścicielki**: to jej decyzja, nie projektanta. Jest na to miejsce w sekcji „Prywatnie”.
- **Rezerwacja online z kalendarzem**: wymaga backendu i decyzji o narzędziu; makieta pokazuje tylko, co dzieje się po wysłaniu.
- **Analityka i cookies**: strona gabinetu terapeutycznego nie powinna śledzić odwiedzających; jeśli statystyki są potrzebne, wybrać narzędzie bez cookies.
- **Cennik „od”**: lepiej jedna jasna cena niż widełki, które każą dopytywać.
