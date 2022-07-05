export default function dataFormatter(data) {
  console.log(data);
  return data.map((item) => {
    item.company = item.Company.name;
    item.job = item.Job.name;
    item.name = item.User?.name || null;
    item.status = item.status || item.Status?.id || item.status_id || null;
    delete item.Company;
    delete item.Job;
    delete item.User;
    delete item.Status;
    delete item.status_id;
    delete item.status_id;
    delete item.company_id;
    delete item.job_id;
    return item;
  });
}
