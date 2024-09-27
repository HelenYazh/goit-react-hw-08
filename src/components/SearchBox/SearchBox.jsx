import { useDispatch, useSelector } from "react-redux";
import css from "./SearchBox.module.css";
import { changeFilter } from "../../redux/filters/slice";
import { selectFilterValue } from "../../redux/filters/selectors";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectFilterValue);

  const handleSearch = (evt) => {
    const value = evt.target.value;
    dispatch(changeFilter(value));
  };

  return (
    <div className={css.wrapper}>
      <div className={css.searchBox}>
        <label htmlFor="searchBox">Find contacts by name or number</label>
        <input
          className={css.searchLine}
          id="searchBox"
          type="text"
          placeholder="abc..."
          value={filterValue}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchBox;
