import React, { useState, useEffect } from "react";
import styles from "../assets/css/dashboard.module.css"; //css file
//components
import { toast, Toaster } from "react-hot-toast";
import Table from "../components/Table";
import Chart from "../components/Chart";
import ProfileOptions from "../components/ProfileOptions";
import Loader from "../components/Loader";
//helper functions
import { getLeads } from "../api";
function Dashboard(props) {
  //state

  let [index, setIndex] = useState({
    min: 0,
    max: 10,
  }); //1. set data index  of table

  let [leads, setLeads] = useState(); //2.  lead data in state
  let [pageNumber, setInputPageNumber] = useState(1); //3. set Page number to display on table
  let [showProfileopts, setShowProfileOpts] = useState(false); //4. state to handle profile options display

  //handle show next table data
  function handleNext() {
    if (index.max >= leads.leads.length) {
      return;
    }
    setIndex((prev) => ({ min: prev.min + 10, max: prev.max + 10 }));
    setInputPageNumber(pageNumber + 1);
  }
  // handle show previous table data
  function handlePrev() {
    if (index.min <= 0) {
      return;
    }
    setIndex((prev) => ({ min: prev.min - 10, max: prev.max - 10 }));
    setInputPageNumber(pageNumber - 1);
  }
  //get lead data on component load
  useEffect(() => {
    async function getLeadData() {
      let response = await getLeads();
      if (response.success) {
        setLeads(response.data.data);
      }
      //if client has unauthorized token
      if (response.message && response.message.includes("Unexpected token")) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
      //if ZOHO internal server error occured
      if (response.message === "cannot connect to ZOHO") {
        console.log(response);
        toast((t) => (
          <span
            style={{
              width: "max-content",
              fontSize: "12px",
              fontWeight: "700",
            }}
          >
            Unable to fetch from ZOHO Previous leads generated
          </span>
        ));

        setLeads(response.leads);
      }

      if (response.serverError) {
        window.location.href = "/404";
      }
    }
    getLeadData();
  }, []);
  //handle refresh lead data
  async function refreshLeadsData() {
    setLeads(null);
    let response = await getLeads();
    if (response.success) {
      setLeads(response.data.data);
    }
  }

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />

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
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <hr />
        </div>
        <div className={styles.main}>
          <div className={styles.dashboardWrapper}>
            <div className={styles.data}>
              {/* show lead data identifier and last updated  */}
              <div
                className={styles.identifier}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span style={{ fontSize: "1.2rem", fontWeight: "700" }}>
                  Your Leads
                </span>
                <span
                  style={{ fontSize: "14px", color: "blue", fontWeight: "400" }}
                >
                  Last Updated On:{" "}
                  {leads ? leads.createdAt.split("T")[0] : null}
                </span>
              </div>
              {/* Table Component */}
              <div className={leads ? styles.table : styles.loadingTable}>
                {leads ? (
                  <>
                    <Table index={index} data={leads.leads} />
                    {/* Table options */}
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
              {/* Chart component */}
              <h3 className={styles.identifier}>Lead Sources</h3>

              <div className={leads ? styles.chart : styles.loadingChart}>
                {leads ? <Chart data={leads.source_data} /> : <Loader />}
              </div>
            </div>
            {/* Tile component */}
            <div className={styles.tile}>
              <span>{leads ? leads.leads.length : "NA"}</span>
              <span style={{ fontSize: "20px" }}>Total Leads</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
