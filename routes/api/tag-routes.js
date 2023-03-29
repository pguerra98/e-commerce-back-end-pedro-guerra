const router = require('express').Router();

const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {

  // find all tags

  // be sure to include its associated Product data

  try {

    const categoryInfo = await Tag.findAll({

      include:[{model:Product}],

    });
    
    res.status(200).json(categoryInfo);

  } catch(err) {

    res.status(500).json(err);

  }

});

router.get('/:id', async(req, res) => {

  // find a single tag by its `id`

  // be sure to include its associated Product data

  try {

    const tagInfo = await Tag.findByPk(req.params.id, {

      include:[{model:Product}],

    });
      
    if (!tagInfo) {

      res.status(404).json({message:'Based on id, no tag was found.'});

      return;
    
    }

    res.status(200).json(tagInfo);

    } catch (err) {

      res.status(500).json(err);

    }

});

router.post('/', async(req, res) => {

  // create a new tag

  try {

    const tagInfo = await Tag.update(req.body, {

      where: {id:req.params.id,}

    });

    if (!tagInfo[0]) {

      res.status(404).json({message:'Based on id, no tag was found.'});
      
      return;

    }
    
    res.status(200).json(tagInfo);

  } catch (err) {

    res.status(500).json(err);

  }

});

router.put('/:id', async(req, res) => {

  // update a tag's name by its `id` value

  try {

    const tagInfo = await Tag.update(req.body, {

      where: {id:req.params.id,}

    });

    if (!tagInfo[0]) {

      res.status(404).json({message:'Based on id, no tag was found.'});

      return;

    }

    res.status(200).json(tagInfo);

  } catch(err) {

    res.status(500).json(err);

  }

});

router.delete('/:id', async(req, res) => {

  // delete on tag by its `id` value

  try {

    const tagInfo = await Tag.destroy({
      
      where: {id:req.params.id,}

    });

    if (!tagInfo) {

      res.status(404).json({message:'Based on id, no tag was found.'});

      return;

    }

    res.status(200).json('The tag has been removed.');

  } catch (err) {

    res.status(500).json(err);
    
  }

});

module.exports = router;
