import s from "./App.module.css";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "./redux/contactsOps";
import { selectError, selectLoading } from "./redux/contactsSlice";
import { Loader } from "./components/Loader/Loader";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // запускаєм її
    dispatch(fetchContacts());
  }, [dispatch]);

  // витягуєм
  const isError = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  return (
    <div className={s.container}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
      {isError && <h2>Something went wrong!</h2>}
      {isLoading && <Loader />}
    </div>
  );
};

export default App;
