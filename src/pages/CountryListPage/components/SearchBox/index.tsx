import styles from "./searchBox.module.scss";

type Props = {
  searchText: string;
  /** Callback to be called after search text changes */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Callback to be called on search */
  onSearch: () => void;
};

function SearchBox(props: Props) {
  const { searchText, onChange, onSearch } = props;

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        value={searchText}
        onChange={onChange}
        placeholder="Enter country name here"
        className={styles.inputBox}
      />
      <button
        onClick={onSearch}
        className={styles.button}
        disabled={!searchText}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBox;
