export default function dataFormatter(data) {
  return data.map((item) => {
    console.log(item);
    item.company = item.Company.name;
    item.job = item.Job.name;
    item.name = item.User.name;
    item.status = item.status || item.Status?.id || null;
    delete item.Company;
    delete item.Job;
    delete item.User;
    delete item.Status;
    return item;
  });
}
