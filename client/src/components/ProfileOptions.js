import React from "react";
//profile dropdown
function ProfileOptions(props) {
  //handle logout button
  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <div style={Styles.profileOptions}>
      <div
        className='li-po'
        style={Styles.listItem}
        onClick={() => props.getLeads()}
      >
        Refresh Leads
      </div>
      <div className='li-po' style={Styles.listItem} onClick={() => logout()}>
        Logout
      </div>
    </div>
  );
}

export default ProfileOptions;
//custom styles
const Styles = {
  profileOptions: {
    height: "max-content",
    width: "158px",
    backgroundColor: "white",
    position: "absolute",
    right: "28px",
    top: "10vh",
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

    cursor: "pointer",
  },
};
