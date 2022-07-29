import React, { useState } from "react";
import { sample_data } from "../utils";
import styles from "../assets/css/dashboard.module.css";
import Table from "../components/Table";
import Chart from "../components/Chart";
import ProfileOptions from "../components/ProfileOptions";
function Dashboard() {
  let [index, setIndex] = useState({
    min: 0,
    max: 10,
  });

  let [pageNumber, setInputPageNumber] = useState(1);
  let [showProfileopts, setShowProfileOpts] = useState(false);
  function handleNext() {
    if (index.max >= sample_data.data.length) {
      return;
    }
    setIndex((prev) => ({ min: prev.min + 10, max: prev.max + 10 }));
    setInputPageNumber(pageNumber + 1);
  }

  function handlePrev() {
    if (index.min <= 0) {
      return;
    }
    setIndex((prev) => ({ min: prev.min - 10, max: prev.max - 10 }));
    setInputPageNumber(pageNumber - 1);
  }

  return (
    <div className={styles.dashboard}>
      <nav className={styles.nav}>
        {showProfileopts ? <ProfileOptions /> : null}
        <div className={styles.dashboardLogo}>Dashboard</div>
        <div className={styles.profile}>
          <img
            src='https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2021/03/whatsapp-image-2021-03-11-at-11-1615442109.jpeg'
            alt=''
            onClick={() => {
              setShowProfileOpts((prev) => !prev);
            }}
          ></img>
        </div>
      </nav>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <hr />
      </div>
      <div className={styles.main}>
        <div className={styles.dashboardWrapper}>
          <div className={styles.data}>
            <div className={styles.table}>
              <Table index={index} data={sample_data.data} />
              <div className={styles.tableOptions}>
                <button
                  className={styles.loginBtn}
                  onClick={() => handlePrev()}
                >
                  <img
                    style={{ height: "15px", width: "15px" }}
                    src='https://cdn-icons-png.flaticon.com/512/860/860790.png'
                    alt='previous'
                  />
                </button>
                <input
                  type='text'
                  value={pageNumber}
                  onChange={(e) => {
                    setInputPageNumber(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    console.log(e.code);
                    if (e.code === "Enter" || e.code === "NumpadEnter") {
                      if (pageNumber < 6 && pageNumber > 0) {
                        setIndex({
                          min: (pageNumber - 1) * 10,
                          max: pageNumber * 10,
                        });
                      } else {
                        setIndex({
                          min: 0,
                          max: 10,
                        });
                        setInputPageNumber(1);
                      }
                    }
                  }}
                ></input>
                <div> / {sample_data.data.length / 10}</div>
                <button
                  className={styles.loginBtn}
                  onClick={() => {
                    handleNext();
                  }}
                >
                  <img
                    style={{ height: "15px", width: "15px" }}
                    src='https://cdn-icons-png.flaticon.com/512/709/709586.png'
                    alt='next'
                  ></img>
                </button>
              </div>
            </div>

            <div className={styles.chart}>
              <Chart data={sample_data.data} />
            </div>
          </div>
          <div className={styles.tile}>
            <span>{sample_data.data.length}</span>
            <span style={{ fontSize: "20px" }}>Total Leads</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
