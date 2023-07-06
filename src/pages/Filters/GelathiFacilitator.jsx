import { useState, useEffect } from 'react';
import ListTabledata from './components/ListTabledata';
import ApiRequest from './components/ApiRequest';
import SearchCommon from './components/SearchCommon';
import Projectapi from './components/Projectsapi';
export default function Gelathis({ selectDATA, getData,type ,date,endDate,dateValue,endDateValue}) {

  const [glead, setGlead] = useState();
  const [searchInFilter, setSearchInFilter] = useState(null)


  useEffect(() => {
    lead()
  }, [])

  const lead = async () => { 
    if(type=="Projects")
  {
    Projectapi({ selectDATA:6}).then(res =>setGlead(res))
  }
  else{
    ApiRequest({ selectDATA: 6 }).then(res => setGlead(res))
  }
}
  const getSearchFilter = (e) => {
    setSearchInFilter(e)
  }

  const returnSearchFilter = () => {
    return searchInFilter
  }

  return (
    <div>
      <SearchCommon getSearchFilter={(e) => { getSearchFilter(e) }} />
      <ListTabledata data={glead} getData={getData} date={date} endDate={endDate} dateValue={dateValue} endDateValue={endDateValue} selectDATA={13} type="Field Associate" returnSearchFilter={returnSearchFilter} />
    </div>
  );
}
