const sql = require("./db.js");

// constructor
const Comment = function (comment) {
    this.text = comment.text;
    this.user_id = comment.user_id;
    this.posts_id = comment.posts_id;
};

Comment.create = (newComment, result) => {
    sql.query("INSERT INTO comments SET ?", newComment, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created comment: ", { id: res.insertId, ...newComment });
        result(null, { id: res.insertId, ...newComment });
    });
};

Comment.findById = (commentId, result) => {
    sql.query(`SELECT * FROM comments WHERE id = ${commentId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found comment with the id
        result({ kind: "not_found" }, null);
    });
};

Comment.findByPostId = (postId, result) => {
    sql.query(
        `SELECT * FROM comments WHERE posts_id = ${postId}`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, res);
        }
    );
};

Comment.getAll = (result) => {
    sql.query("SELECT * FROM comments", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Comment.updateById = (id, text, result) => {
    sql.query(
        "UPDATE comments SET text = ? WHERE id = ?",
        [text, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found comment with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated comment: ", { id: id, ...comment });
            result(null, { id: id, ...comment });
        }
    );
};

Comment.remove = (id, result) => {
    sql.query("DELETE FROM comments WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found comment with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted comment with id: ", id);
        result(null, res);
    });
};

Comment.removeAll = (result) => {
    sql.query("DELETE FROM comments", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} comments`);
        result(null, res);
    });
};

module.exports = Comment;
