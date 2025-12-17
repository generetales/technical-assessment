import { Dispatch } from "react";
import styles from "./countryTable.module.scss";

type Image = { svg?: string; png?: string; alt?: string };

export type Country = {
  name: { common: string; official: string };
  cca2: string;
  currencies: {
    [code: string]: {
      name: string;
      symbol: string;
    };
  };
  flags: Image;
  coatOfArms: Image;
  car: {
    side: "left" | "right"; // Driving side
  };
};

type TableProps = {
  countryList: Country[];
  /** Callback to be called on search */
  onClickView: (countryCode: string) => void;
  /** Flag to check if data is fetching */
  isFetching: boolean;
  /** Pagination */
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<React.SetStateAction<number>>;
};

type RowProps = {
  country: Country;
  index: number;
  /** Callback to be called on search */
  onClickView: (countryCode: string) => void;
};

function CountryTable(props: TableProps) {
  const {
    countryList,
    onClickView,
    isFetching,
    currentPage,
    totalPages,
    setCurrentPage,
  } = props;

  return (
    <div className={styles.countryTable}>
      <div className={`${styles.header} ${styles.row}`}>
        <div className={styles.cell}>Country Name</div>
        <div className={styles.cell}>Country Code</div>
        <div className={styles.cell}>Currency</div>
        <div className={styles.cell}></div>
      </div>

      {isFetching ? (
        <SkeletonTable />
      ) : (
        <>
          {countryList?.map((country: Country, index: number) => (
            <TableRow
              country={country}
              index={index}
              onClickView={onClickView}
            />
          ))}

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function TableRow(props: RowProps) {
  const { country, index, onClickView } = props;

  const currency = Object.values(country.currencies)[0];
  const countryCode = country.cca2;

  const handleOnClickView = () => {
    onClickView(countryCode);
  };

  return (
    <div className={styles.row} key={index}>
      <div className={styles.cell}>{country.name.official}</div>
      <div className={styles.cell}>{countryCode}</div>
      <div className={styles.cell}>{currency?.name || "No Data"}</div>
      <div
        className={`${styles.cell} ${styles.view}`}
        onClick={handleOnClickView}
      >
        View
      </div>
    </div>
  );
}

function SkeletonTable() {
  return (
    <div className={`${styles.row} ${styles.skeleton}`}>
      <div className={styles.cell}> </div>
      <div className={styles.cell}></div>
      <div className={styles.cell}></div>
      <div className={styles.cell}></div>
    </div>
  );
}

export default CountryTable;
