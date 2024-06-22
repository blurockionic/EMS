import { Tags } from "../model/tagsSchema.js";

export const createTags = async (req, res) => {
  try {
    const { tagName, color } = req.body;
    if (!tagName) {
      return (
        res.status(400),
        json({
          success: false,
          message: "tag Name required",
        })
      );
    }
    const newTag = await Tags.create({
      tagName,
      color,
    });
    return res.status(201).json({
      success: true,
      tag: newTag,
      message: " tag created successfully ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "unable to create tags",
      error,
    });
  }
};

export const getAllTags = async (req, res) => {
  try {
    //validation
    const allTags = await Tags.find({});

    if (!allTags) {
      return res.status(500).json({
        success: false,
        message: "No record found",
      });
    }

    //get all task
    return res.status(200).json({
      success: true,
      allTags,
      message: "All task fetch successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
