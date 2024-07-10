import styles from "./Hero.module.css";
import { useState, useEffect } from "react";

const Hero = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [data, setData] = useState([]);
  const [add, setAdd] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    age: "",
    aadharNum: "",
    mobileNum: "",
  });
  const [searchAadharNum, setSearchAadharNum] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("personData")) || [];
    setData(storedData);
    console.log("Data retrieved from localStorage:", storedData);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.mobileNum.length !== 10) {
      alert("Mobile Number must be exactly 10 digits!");
      return;
    }

    if (formData.aadharNum.length !== 12) {
      alert("Aadhaar Number must be exactly 12 digits!");
      return;
    }

    const storedData = JSON.parse(localStorage.getItem("personData")) || [];
    if (storedData.some((item) => item.aadharNum === formData.aadharNum)) {
      alert("Aadhaar Number already exists!");
    } else {
      const updatedData = [...storedData, formData];
      localStorage.setItem("personData", JSON.stringify(updatedData));
      console.log("Data saved to localStorage:", updatedData);
      setData(updatedData);
      setFormData({
        name: "",
        dob: "",
        age: "",
        aadharNum: "",
        mobileNum: "",
      });
      setAdd(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchAadharNum(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const result = data.find((item) => item.aadharNum === searchAadharNum);
    setSearchResults(result ? [result] : []);
    console.log("Search results:", result ? [result] : []);
  };

  const handleDelete = (aadharNum) => {
    const storedData = JSON.parse(localStorage.getItem("personData")) || [];
    const updatedData = storedData.filter(
      (item) => item.aadharNum !== aadharNum
    );
    localStorage.setItem("personData", JSON.stringify(updatedData));
    setData(updatedData);
    setSearchResults([]);
    console.log("Data after deletion:", updatedData);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.tabsContainer}>
        <div className={styles.tabButtons}>
          <button
            className={`${styles.button} ${
              activeTab === "add" ? styles.active : ""
            }`}
            onClick={() => handleTabChange("add")}
          >
            Add New Person
          </button>
          <button
            className={`${styles.button} ${
              activeTab === "search" ? styles.active : ""
            }`}
            onClick={() => handleTabChange("search")}
          >
            Search
          </button>
          <button
            className={`${styles.button} ${
              activeTab === "retrieve" ? styles.active : ""
            }`}
            onClick={() => handleTabChange("retrieve")}
          >
            Retrieve Information
          </button>
        </div>
        <div className={styles.tabContent}>
          {activeTab === "add" && (
            <div className={styles.tabOne}>
              <div className={styles.head}>
                <span>Add New Person</span>
              </div>
              <div className={styles.formContainer}>
                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="dob">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      id="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="age">Age</label>
                    <input
                      type="number"
                      name="age"
                      id="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="mobileNum">Mobile Number</label>
                    <input
                      type="text"
                      name="mobileNum"
                      id="mobileNum"
                      maxLength="10"
                      value={formData.mobileNum}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="aadharNum">Aadhaar Number</label>
                    <input
                      type="text"
                      name="aadharNum"
                      id="aadharNum"
                      maxLength="12"
                      value={formData.aadharNum}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="aadharNum">&nbsp; &nbsp;</label>
                    <button type="submit">Save</button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {activeTab === "search" && (
            <div className={styles.tabTwo}>
              <div className={styles.head}>
                <span>Search Content</span>
              </div>
              <div className={styles.searchContainer}>
                <div className={styles.searchGroup}>
                  <div>
                    <input
                      type="text"
                      id="searchAadharNum"
                      name="searchAadharNum"
                      value={searchAadharNum}
                      onChange={handleSearchChange}
                      placeholder="Aadhaar Number"
                      required
                    />
                  </div>
                  <div>
                    <button onClick={handleSearch}>Search</button>
                  </div>
                </div>
                <div className={styles.cards}>
                  {searchResults.length > 0 ? (
                    searchResults.map((item) => (
                      <div key={item.aadharNum} className={styles.card}>
                        <div>Name: {item.name}</div>
                        <div>Date of Birth: {item.dob}</div>
                        <div>Age: {item.age}</div>
                        <div>Mobile Number: {item.mobileNum}</div>
                        <div>Aadhaar Number: {item.aadharNum}</div>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDelete(item.aadharNum)}
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  ) : (
                    <div>No results found.</div>
                  )}
                </div>
              </div>
            </div>
          )}
          {activeTab === "retrieve" && (
            <div className={styles.tabThree}>
              <div className={styles.head}>
                <span>Retrieve Information Content</span>
              </div>
              <div className={styles.retrieveContainer}>
                {data.length > 0 ? (
                  data.map((item) => (
                    <div key={item.aadharNum} className={styles.card}>
                      <div>
                        <b>Name:</b> {item.name}
                      </div>
                      <div>
                        <b>Date of Birth:</b> {item.dob}
                      </div>
                      <div>
                        <b>Age:</b> {item.age}
                      </div>
                      <div>
                        <b>Mobile Number:</b> {item.mobileNum}
                      </div>
                      <div>
                        <b>Aadhaar Number:</b> {item.aadharNum}
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No data available.</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
