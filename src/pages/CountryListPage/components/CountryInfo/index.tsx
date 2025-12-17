import { Country } from "../CountryTable";
import styles from "./countryInfo.module.scss";

type Props = {
  country: Country;
};

function CountryInfo(props: Props) {
  const { country } = props;

  const currency = Object.values(country.currencies)[0];

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <label>Official Name:</label> {country.name.official}
      </div>
      <div className={styles.info}>
        <label>Common Name:</label> {country.name.common}
      </div>
      <div className={styles.info}>
        <label>Currency Name:</label>{" "}
        {currency ? `${currency.name} (${currency.symbol})` : "No Data"}
      </div>
      <div className={styles.info}>
        <label>Flag:</label>
        <img
          src={country.flags.png}
          alt={country.flags.alt}
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <label>Coat of Arms:</label>
        <img
          src={country.coatOfArms.png}
          className={styles.image}
          alt="Coat of Arms"
        />
      </div>
      <div className={styles.info}>
        <label>Driving Side:</label> {country.car.side}
      </div>
    </div>
  );
}

export default CountryInfo;
