import User from '../models/User.js';

export const loginUser = async (identifier, course) => {
  try {
    const normalizedIdentifier = (identifier || '').trim();
    const user = await User.findOne({
      $or: [
        { studentId: normalizedIdentifier },
        { email: normalizedIdentifier.toLowerCase() }
      ]
    });

    if (!user) {
      return { success: false, error: 'User not found. Please sign up first.' };
    }

    if (course && user.course !== course) {
      user.course = course;
      await user.save();
    }

    return {
      success: true,
      user: {
        id: user.studentId,
        email: user.email,
        course: user.course,
        name: user.name,
        isAdmin: user.isAdmin
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signupUser = async ({ studentId, name, email, course }) => {
  try {
    const existingUser = await User.findOne({
      $or: [{ studentId }, { email }]
    });

    if (existingUser) {
      return { success: false, error: 'User already exists. Please login.' };
    }

    const user = new User({
      studentId,
      name,
      email: email || `${studentId}@college.edu`,
      course,
      isAdmin: false
    });

    await user.save();

    return {
      success: true,
      user: {
        id: user.studentId,
        email: user.email,
        course: user.course,
        name: user.name,
        isAdmin: user.isAdmin
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getUserProfile = async (studentId) => {
  try {
    const user = await User.findOne({ studentId });
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    return {
      success: true,
      user: {
        id: user.studentId,
        email: user.email,
        course: user.course,
        name: user.name,
        isAdmin: user.isAdmin
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
