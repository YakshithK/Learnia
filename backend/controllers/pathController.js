import dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai'
const openai = new OpenAI({apiKey: process.env.API_KEY, dangerouslyAllowBrowser: true})


export const getPath = async (req, res, next) => {

    const {input} = req.body

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: 'generate a specific learning roadmap path for ' + input + ' in this format ### Stage 1: Introduction to Blender (Weeks 1-2) #### Objectives: - Understand the Blender interface and basic navigation. - Learn the basic tools and functions. #### Topics: 1. **Installation and Setup** - Download and Install Blender. - Familiarize yourself with the community and resources. 2. **User Interface** - Navigation (Viewports, Panels, etc.). - Understanding the layout and menus. 3. **Basic Operations** - Selecting, moving, scaling, and rotating objects. - Using the outliner and properties panel. #### Resources: - [Blender Beginner\'s Guide](https://www.blender.org/support/tutorials/) - YouTube: Search for "Blender Beginner Tutorial" (Blender Guru has excellent introductory content) ### Stage 2: Basic Modeling (Weeks 3-4) #### Objectives: - Create simple models using basic geometry and learn the modeling tools. #### Topics: 1. **Basic Modeling Techniques** - Understanding mesh topology. - Introduction to Primitive Shapes and Edit Mode. - Basic tools: Extrude, Loop Cut, Knife Tool, etc. 2. **Creating Simple Models** - Model simple objects (e.g., a chair, a cup). 3. **Object Modifiers** - Overview of modifiers: Subdivision Surface, Mirror. #### Resources: - YouTube: "Blender Modeling for Beginners" by Blender Guru. - Online Courses: Site such as Udemy or Skillshare offer beginner courses. ### Stage 3: Texturing and Materials (Weeks 5-6) #### Objectives: - Learn how to apply textures and materials to objects. #### Topics: 1. **Introduction to Shading** - Understanding materials in Blender. - Using the Shader Editor. 2. **Applying Textures** - UV Mapping basics. - Image textures vs. procedural textures. 3. **Lighting Basics** - Introduction to light types and settings. - Setting up a basic scene lighting. #### Resources: - Blender Documentation: Shading and Textures section. - YouTube: "Blender Texturing for Beginners". ### Stage 4: Lighting and Rendering (Weeks 7-8) #### Objectives: - Set up a scene for rendering with proper lighting. #### Topics: 1. **Advanced Lighting Techniques** - Three-point lighting. - Using HDRI for realistic lighting. 2. **Rendering Settings** - Understanding Render Engines (Cycles vs. Eevee). - Adjusting render settings for quality vs. speed. 3. **Creating a Rendered Scene** - Finalizing your scene and rendering an image. #### Resources: - Blender Guru: "The Ultimate Guide to Lighting in Blender". - Blender Documentation: Rendering section. ### Stage 5: Animation Basics (Weeks 9-10) #### Objectives: - Learn the basics of animation in Blender. #### Topics: 1. **Keyframes and Animation Workflow** - Setting up keyframes. - Understanding the timeline and graph editor. 2. **Basic Animation Techniques** - Animating object movement, rotation, and scale. 3. **Introduction to Rigging** - Basic rigging concepts for character animation. #### Resources: - YouTube: "Blender Animation for Beginners". - Online courses focused on Blender animation. ### Stage 6: Intermediate Principles (Weeks 11-14) #### Objectives: - Deepen your modeling, texturing, and animation skills. #### Topics: 1. **Intermediate Modeling Techniques** - Sculpting basics. - Hard surface modeling techniques. 2. **Advanced Texturing** - Baking textures. - Using image textures with procedural nodes. 3. **Character Animation** - Rigging a simple character. - Basic walk cycle. #### Resources: - Blender Artists Community. - YouTube: Channels like CG Geek and Ducky 3D. ### Stage 7: Project Development (Weeks 15+) #### Objectives: - Apply learned skills to create complete projects. #### Topics: 1. **Project Planning** - Choose a project (e.g., a short animation, game asset). 2. **Complete Workflow** - Modeling, Texturing, Rigging (if applicable), Lighting, and Rendering. 3. **Feedback and Iteration** - Share your work in communities for feedback and improve. #### Resources: - Blender Community Forums. - Online challenges (like the Blender Artists Community).'
            },
        ],
    });

    res.status(201).json(completion.choices[0].message)
}

