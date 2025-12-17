import { ChangeEvent, useState } from "react";

import CountryTable, { Country } from "./components/CountryTable";
import styles from "./countryListPage.module.scss";
import SearchBox from "./components/SearchBox";
import CountryInfo from "./components/CountryInfo";

const PAGE_SIZE = 5;

function CountryListPage() {
  const [searchText, setSearchText] = useState("");
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country>();

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentData = countryList.slice(startIndex, startIndex + PAGE_SIZE);
  const totalPages = Math.ceil(countryList.length / PAGE_SIZE);

  const fetchCountryList = async () => {
    setIsFetching(true);
    setError("");

    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(
      searchText
    )}?fields=name,cca2,currencies,flags,coatOfArms,car`;

    try {
      const res = await fetch(url);
      // restcountries returns 404 if no matches; treat as "no data", not a hard error
      if (res.status === 404) {
        setCountryList([]);
      } else if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      } else {
        const data: Country[] = await res.json();
        setCountryList(data);
      }
    } catch (e: any) {
      setError(e.message ?? "Unexpected error");
    } finally {
      setIsFetching(false);
    }
  };

  const handleOnChangeSearchText = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
  };

  const hanleOnSearch = () => {
    setSelectedCountry(undefined);
    setCurrentPage(1);
    fetchCountryList();
  };

  const handleOnClickView = (countryCode: string) => {
    const country = countryList.find((country) => country.cca2 === countryCode);

    setSelectedCountry(country);
  };

  return (
    <div className={styles.wrapper}>
      <h1>Country Information List Page</h1>

      <SearchBox
        searchText={searchText}
        onChange={handleOnChangeSearchText}
        onSearch={hanleOnSearch}
      />
      {selectedCountry && <CountryInfo country={selectedCountry} />}

      {error ? (
        error
      ) : (!currentData || currentData.length === 0) && !isFetching ? (
        <span className={styles.label}>
          Enter a country name to search, or no matches were found.
        </span>
      ) : (
        <CountryTable
          countryList={currentData}
          onClickView={handleOnClickView}
          isFetching={isFetching}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default CountryListPage;
