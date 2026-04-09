import { motion } from "framer-motion";

const SocialLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-secondary hover:text-primary underline underline-offset-2 transition-colors text-sm"
  >
    {children}
  </a>
);

const SkillGroup = ({ title, skills }) => (
  <div className="mb-3">
    <span className="text-xs uppercase tracking-widest text-secondary font-merriweather block mb-1.5">{title}</span>
    <p className="text-sm leading-relaxed text-primary/80">{skills}</p>
  </div>
);

const HeroSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="mb-20 pb-12 border-b border-secondary/20"
    >
      <div className="flex flex-col sm:flex-row items-start gap-8 mb-10">
        <img
          src="/assets/images/profiles/pfp.webp"
          alt="Mackenzie Sampson"
          className="w-24 h-24 rounded-full object-cover border border-secondary/20"
        />
        <div>
          <h1 className="font-bold text-3xl sm:text-4xl font-merriweather mb-1 text-primary">
            mackenzie sampson
          </h1>
          <p className="text-secondary italic mb-4">Technical Artist &amp; Software Engineer</p>
          <div className="flex flex-wrap gap-4">
            <SocialLink href="https://github.com/macsampson">GitHub</SocialLink>
            <SocialLink href="https://macsampson.artstation.com/">ArtStation</SocialLink>
            <SocialLink href="https://linkedin.com/in/macsampson">LinkedIn</SocialLink>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <p className="text-base leading-relaxed text-primary/85 mb-4">
            I'm Mackenzie, a technical artist and software engineer who exists at the border between art tools and graphics programming.
          </p>
          <p className="text-base leading-relaxed text-primary/85">
            My first job out of school was at EA, building Python pipelines in Maya for FIFA and the Ignite engine. After that I spent a couple of years running a 3D-printed keycap business, which turned out to be mostly procedural Blender tooling and a lot of backend code. These days I split my time between artist-facing work like shaders, engine tools, and pipeline work, and going deeper into the rendering stack with C++, path tracing, and Vulkan.
          </p>
        </div>

        <div className="border-l border-secondary/20 pl-8">
          <div className="mb-5">
            <span className="text-xs uppercase tracking-widest text-secondary font-merriweather block mb-1.5">Education</span>
            <p className="text-sm font-semibold">University of British Columbia</p>
            <p className="text-sm text-primary/70">Bachelor of Computer Science</p>
          </div>
          <div className="h-px bg-secondary/15 my-4" />
          <SkillGroup title="Engines" skills="Unreal Engine, Unity" />
          <SkillGroup title="DCC" skills="Maya, Blender, Houdini, Photoshop" />
          <SkillGroup title="Programming" skills="C++, C#, HLSL/GLSL, Python, JavaScript" />
          <SkillGroup title="Graphics" skills="PBR, path tracing, Vulkan" />
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
