const post = require('../models/results_chema');
const User = require('../models/userModel');

module.exports.getAllPost = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const username = user.username;

    const posts = await post
      .find({ userId: req.body.userId })
      .select(['casename_answer', 'SituationSummary_answer', '_id', 'createdAt']); // createdAt 필드를 선택

    const postList = posts.map((post) => ({
      username: username,
      _id: post._id,
      casename_answer: post.casename_answer,
      SituationSummary_answer: post.SituationSummary_answer,
      createdAt: post.createdAt, // createdAt을 post에서 가져와야 함
    }));

    return res.json({ postList });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllPost_one = async (req, res, next) => {
  try {
    const postModel = await post.findById(req.body.postId); // 변수명 수정

    if (!postModel) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const posts = await post
      .find({ _id: req.body.postId }) // _id로 수정
      .select([
        'casename_answer',
        'procedure_answer',
        'documentLists_answer',
        'SituationSummary_answer',
        'situationSummary_result',
        '_id',
      ]); // createdAt 필드를 선택

    const postoneList = {
      // postId와 일치하는 포스트의 정보를 가져와서 객체에 저장
      _id: postModel._id,
      casename_answer: postModel.casename_answer,
      procedure_answer: postModel.procedure_answer,
      documentLists_answer: postModel.documentLists_answer,
      SituationSummary_answer: postModel.SituationSummary_answer,
      situationSummary_result: postModel.situationSummary_result,
    };

    return res.json({ postoneList });
  } catch (ex) {
    next(ex);
  }
};
