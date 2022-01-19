import { toast } from "react-toastify"

export const showErr = err =>{
    // Auth
    err?.name && toast
    .error(err.name.message)
    err?.email && toast
        .error(err.email.message)
    err?.password && toast
        .error(err.password.message)
    err?.password_confirmation && toast
        .error(err.password_confirmation.message)


    // Category
    err?.category_name && toast
        .error(err.category_name.message)
    err?.category_id && toast
        .error(err.category_id.message)

    // Story

    err?.title && toast
        .error(err.title.message)
    err?.summary && toast
        .error(err.summary.message)
    err?.tags && toast
        .error(err.tags.message)
    err?.category_id && toast
        .error(err.category_id.message)

    // Contest

    err?.contest_title && toast
        .error(err.contest_title.message)
    err?.contest_prize && toast
        .error(err.contest_prize.message)


    // Feedback
    err?.comment && toast
        .error(err.comment.message)

}

export const toastErr = err =>{
     toast
        .error(err[0])
}

