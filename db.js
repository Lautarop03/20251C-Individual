// map to persist data in memory
const courses = new Map();

const Database = {
  // Returns all courses in reverse chronological order.
  getAll: () => {
    return Array.from(courses.entries())
        .map(([id, course]) => ({
               // TODO: mostrar en orden cronológico inverso
               id,
               title: course.title,
               description: course.description
             }));
  },

  // Returns a course by its ID.
  // If the course doesn't exist, it returns undefined (.get implements this
  // behavior)
  getById: (id) => {
    return courses.get(id);
  },

  // Adds a new course to the database
  create: (data) => {
    const {id, title, description} = data;
    courses.set(id, {title, description});
  },

  // Return true if the course was deleted, false if it didn't exist
  delete: (id) => {
    return courses.delete(id);
  },

  // Return true if the course exists, false if it didn't
  exists: (id) => {
    return courses.has(id);
  }
};

module.exports = Database;