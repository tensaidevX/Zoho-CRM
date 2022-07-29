import React from "react";

function ProfileOptions() {
  return (
    <div style={Styles.profileOptions}>
      <div className='li-po' style={Styles.listItem}>
        Refresh Leads
      </div>
      <div className='li-po' style={Styles.listItem}>
        Logout
      </div>
    </div>
  );
}

export default ProfileOptions;

const Styles = {
  profileOptions: {
    height: "max-content",
    width: "150px",
    backgroundColor: "white",
    position: "absolute",
    right: "28px",
    top: "9vh",
    fontSize: "14px",
    fontWeight: "600",
    color: "gray",
    borderRadius: "0px 0px 10px 10px",
  },
  listItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "40px",
    width: "100%",
    "&:hover": {
      backgroundColor: "purple",
    },
    cursor: "pointer",
  },
};
