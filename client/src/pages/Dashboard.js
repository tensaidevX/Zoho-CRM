import React, { useState, useEffect } from "react";
import styles from "../assets/css/dashboard.module.css";
import Table from "../components/Table";
import Chart from "../components/Chart";
import ProfileOptions from "../components/ProfileOptions";
import Loader from "../components/Loader";
import { getLeads } from "../api";
function Dashboard(props) {
  let [index, setIndex] = useState({
    min: 0,
    max: 10,
  });

  let [leads, setLeads] = useState();
  let [pageNumber, setInputPageNumber] = useState(1);
  let [showProfileopts, setShowProfileOpts] = useState(false);
  function handleNext() {
    if (index.max >= leads.leads.length) {
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

  useEffect(() => {
    async function getLeadData() {
      let response = await getLeads();
      if (response.success) {
        setLeads(response.data.data);
      }
      if (response.message && response.message.includes("Unexpected token")) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    }
    getLeadData();
  }, []);

  async function refreshLeadsData() {
    setLeads(null);
    let response = await getLeads();
    if (response.success) {
      setLeads(response.data.data);
    }
  }

  return (
    <div className={styles.dashboard}>
      <nav className={styles.nav}>
        {showProfileopts ? (
          <ProfileOptions
            getLeads={() => {
              refreshLeadsData();
            }}
          />
        ) : null}
        <div className={styles.dashboardLogo}>Dashboard</div>
        <div
          className={styles.profile}
          onClick={() => {
            setShowProfileOpts((prev) => !prev);
          }}
        >
          <img src={props.user ? props.user.avatar : ""} alt=''></img>
          <h6> {props.user ? props.user.name : null}</h6>
        </div>
      </nav>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <hr />
      </div>
      <div className={styles.main}>
        <div className={styles.dashboardWrapper}>
          <div className={styles.data}>
            <h3 className={styles.identifier}>Your Leads</h3>

            <div className={leads ? styles.table : styles.loadingTable}>
              {leads ? (
                <>
                  <Table index={index} data={leads.leads} />
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
                    <div> / {leads ? leads.leads.length / 10 : null}</div>
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
                </>
              ) : (
                <Loader />
              )}
            </div>
            <h3 className={styles.identifier}>Lead Sources</h3>

            <div className={leads ? styles.chart : styles.loadingChart}>
              {leads ? <Chart data={leads.source_data} /> : <Loader />}
            </div>
          </div>
          <div className={styles.tile}>
            <span>{leads ? leads.leads.length : "NA"}</span>
            <span style={{ fontSize: "20px" }}>Total Leads</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
