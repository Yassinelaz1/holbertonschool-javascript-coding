const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8');

    const lines = data.trim().split('\n');

    const validLines = lines.filter((line) => line.trim() !== '');

    if (validLines.length < 2) {
      throw new Error('No valid data in the database');
    }

    const studentLines = validLines.slice(1);

    const totalStudents = studentLines.length;
    console.log(`Number of students: ${totalStudents}`);

    const fields = {};

    studentLines.forEach((line) => {
      const [firstname, field] = line.split(',');
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstname);
    });

    for (const field in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, field)) {
        const students = fields[field];
        console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
