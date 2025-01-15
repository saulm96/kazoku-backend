import Subject from "../../models/subjectModel.js";
import subjectError from "../../helpers/errors/subjectError.js";

async function createSubject(name, description) {
    try {
        const subject = await Subject.create({ name, description });
        if (!subject) {
            throw new subjectError.SUBJECT_CREATE_ERROR();
        }
        return subject;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new subjectError.SUBJECT_INVALID_DATA(error.message);
        }
        throw new subjectError.SUBJECT_CREATE_ERROR();
    }
}

async function getAllSubjects() {
    try {
        const subjects = await Subject.find();
        if (!subjects.length) {
            throw new subjectError.SUBJECT_NOT_FOUND();
        }
        return subjects;
    } catch (error) {
        if (error.name === 'SUBJECT_NOT_FOUND') {
            throw error;
        }
        throw new subjectError.SUBJECT_LIST_ERROR();
    }
}

async function getSubject(id) {
    try {
        const subject = await Subject.findById(id);
        if (!subject) {
            throw new subjectError.SUBJECT_NOT_FOUND();
        }
        return subject;
    } catch (error) {
        if (error.name === 'SUBJECT_NOT_FOUND') {
            throw error;
        }
        throw new subjectError.SUBJECT_NOT_FOUND();
    }
}

async function updateSubject(id, name, description) {
    try {
        const subject = await Subject.findByIdAndUpdate(
            id, 
            { name, description },
            { new: true }
        );
        if (!subject) {
            throw new subjectError.SUBJECT_NOT_FOUND();
        }
        return subject;
    } catch (error) {
        if (error.name === 'SUBJECT_NOT_FOUND') {
            throw error;
        }
        if (error.name === 'ValidationError') {
            throw new subjectError.SUBJECT_INVALID_DATA(error.message);
        }
        throw new subjectError.SUBJECT_UPDATE_ERROR();
    }
}

async function deleteSubject(id) {
    try {
        const subject = await Subject.findByIdAndDelete(id);
        if (!subject) {
            throw new subjectError.SUBJECT_NOT_FOUND();
        }
        return subject;
    } catch (error) {
        if (error.name === 'SUBJECT_NOT_FOUND') {
            throw error;
        }
        throw new subjectError.SUBJECT_DELETE_ERROR();
    }
}

export const functions = {
    createSubject,
    getAllSubjects,
    getSubject,
    updateSubject,
    deleteSubject
}

export default functions