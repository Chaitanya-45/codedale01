const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Form = require("../models/Forms");
const FormResponse = require("../models/FormResponse");
router.get("/myformswithresponses", auth, async (req, res) => {
    try {
      const forms = await Form.find({ author: req.user.id });
      const formsWithResponses = await Promise.all(
        forms.map(async (form) => {
          const responses = await FormResponse.find({ form: form._id });
          return { ...form._doc, responses };
        })
      );
      res.json(formsWithResponses);
    } catch (err) {
      console.error("Error fetching forms and responses", err);
      res.status(500).json({ msg: "Server error" });
    }
  });
router.post("/", auth, async (req, res) => {
  const { title, fields } = req.body;
  try {
    const newForm = new Form({
      title,
      fields,
      author: req.user.id,
    });
    const savedForm = await newForm.save();
    res.status(201).json(savedForm);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Place this route before any parameterized routes (like "/:formId")
router.get("/myforms", auth, async (req, res) => {
    try {
      const forms = await Form.find({ author: req.user.id });
      res.json(forms);
    } catch (err) {
      console.error("Error in /myforms:", err);
      res.status(500).json({ msg: "Server error" });
    }
  });

  router.route("/:formId")
  // GET: Retrieve a form for rendering the fill-out page
  .get(async (req, res) => {
    const { formId } = req.params;
    try {
      const form = await Form.findById(formId);
      if (!form) return res.status(404).json({ msg: "Form not found" });
      res.json(form);
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  })
  // PUT: Update the form (requires authentication)
  .put(auth, async (req, res) => {
    const { formId } = req.params;
    const { title, fields } = req.body;
    try {
      const updatedForm = await Form.findByIdAndUpdate(
        formId,
        { title, fields },
        { new: true }
      );
      if (!updatedForm)
        return res.status(404).json({ msg: "Form not found" });
      res.json(updatedForm);
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  });

router.post("/:formId/response", async (req, res) => {
  const { formId } = req.params;
  const { responses } = req.body;
  try {
    const form = await Form.findById(formId);
    if (!form)
      return res.status(404).json({ msg: "Form not found" });
    const newResponse = new FormResponse({
      form: formId,
      responses,
    });
    const savedResponse = await newResponse.save();
    res.status(201).json(savedResponse);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/:formId/responses", auth, async (req, res) => {
  const { formId } = req.params;
  try {
    const form = await Form.findById(formId);
    if (!form) return res.status(404).json({ msg: "Form not found" });
    if (form.author.toString() !== req.user.id)
      return res.status(401).json({ msg: "Unauthorized" });
    const responses = await FormResponse.find({ form: formId });
    res.json(responses);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    
    if (!form) {
      return res.status(404).json({ msg: "Form not found" });
    }
    
    if (form.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized to delete this form" });
    }
    await Form.findByIdAndRemove(req.params.id);
    
    res.json({ msg: "Form deleted successfully" });
  } catch (err) {
    console.error("Error deleting form:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;