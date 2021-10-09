const Question = require('../models/question')
const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_REQUEST = 500;
const STATUS_CODE_PARTIAL_CONTENT = 206;
const STATUS_CODE_NOT_FOUND = 404;

const question_post_create = (req, res) => {
    const question = new Question(req.body)
    question.save()
        .then((result) => {
            res.status(STATUS_CODE_OK).json({
                message: 'Question successfully created',
                questionId: question._id
            })
        })
        .catch(err => {
            res.status(STATUS_CODE_PARTIAL_CONTENT).send(err);
        })
}

const question_put_update = (req, res) => {
    let id = req.params.id;
    let questionUpdates = req.body.content;
    Question.findById(id)
        .then(result => {
            Object.assign(result, req.body.content).save()
                .then(question => {
                    res.status(STATUS_CODE_OK).json({
                        message: "Question updated",
                        question: question.toJSON()
                    })
                })
                .catch(err => {
                    res.status(STATUS_CODE_BAD_REQUEST).send(err);
                })
            })
        .catch(err => {
            res.status(STATUS_CODE_NOT_FOUND).json({
                message: "Question not found"
            })
        });
};

const question_get_details = (req, res) => {
    let id = req.params.id;
    Question.findById(id)
        .then(result => {
            res.status(STATUS_CODE_OK).json({
                message: "Question found",
                question: result.toJSON()
            })
        })
        .catch(err => {
            res.status(STATUS_CODE_NOT_FOUND).json({
                message: "Question not found",
                question: ""
            })
        })
}

const question_delete = (req, res) => {
    const id = req.params.id;
    Question.findByIdAndDelete(id)
        .then(result => {
            res.status(STATUS_CODE_OK).json({
                message: "Question deleted"
            })
        })
        .catch(err => {
            res.status(STATUS_CODE_NOT_FOUND).json({
                message: "Question not found",
                error: err
            })
        })
}

module.exports = {
    question_post_create,
    question_put_update,
    question_get_details,
    question_delete,
}