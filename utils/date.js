export const convertDate = (createdAt) => {
  const created_date = new Date(createdAt);

  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'October',
    'November',
    'December',
  ];
  const year = created_date.getFullYear();
  const month = months[created_date.getMonth()];
  const date = created_date.getDate();
  const time = date + ' ' + month + ' ' + year;

  return time;
};
