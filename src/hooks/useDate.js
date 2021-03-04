export default function useDate(date) {
    if(date === null) return "Loading ...";
    let formatedDate = "";
    const year = date.slice(0,4)
    const month = date.slice(5, 7);
    const day = date.slice(8);
    if(month === "01") formatedDate += "Jan";
    else if(month === "02") formatedDate += "Feb";
    else if(month === "03") formatedDate += "Mar";
    else if(month === "04") formatedDate += "Apr";
    else if(month === "05") formatedDate += "May";
    else if(month === "06") formatedDate += "Jun";
    else if(month === "07") formatedDate += "Jul";
    else if(month === "08") formatedDate += "Aug";
    else if(month === "09") formatedDate += "Sep";
    else if(month === "10") formatedDate += "Oct";
    else if(month === "11") formatedDate += "Nov";
    else if(month === "12") formatedDate += "Dec";
    formatedDate += " " + day + ", " + year;
    return formatedDate;
} 