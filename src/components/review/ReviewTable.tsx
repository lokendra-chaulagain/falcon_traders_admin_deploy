import React from "react";
import Link from "next/link";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import AddReviewDialog from "./AddReviewDialog";

export default function ReviewTable({ deleteReview, reviews, setIsUpdated }: any) {
  return (
    <>
      <AddReviewDialog setIsUpdated={setIsUpdated} />
      <div className="customCard mt-2 ">
        <table className="table  ">
          <thead>
            <tr className="customPrimaryTxtColor">
              <th scope="col">S.N</th>
              <th scope="col">Name </th>
              <th scope="col">Position </th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews &&
              reviews.map((review: any, index: any) => (
                <tr className="customPrimaryTxtColor custom_table_hover ">
                  <th scope="row">1</th>
                  <td>{review.name}</td>
                  <td>{review.position}</td>
                  <td>{review.description}</td>

                  <td>
                    <div className="d-flex ">
                      <Link href={`/review/${review._id}`}>
                        <div className="d-flex align-items-center">
                          <AiTwotoneEdit className="edit_button_icon" />
                        </div>
                      </Link>

                      <MdDelete
                        className="delete_button_icon"
                        onClick={() => deleteReview(review._id)}
                        aria-label="delete"
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
