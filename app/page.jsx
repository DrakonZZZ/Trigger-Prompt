import { Triggers } from '@/components';

export default function Home() {
  return (
    <div className="w-full flex-center flex-col">
      <h1 className="header_text text-center">
        Create,Uncover & Share
        <br className="max-md:hidden" />
        <span className="gradient_text"> AI-Prompts</span>
      </h1>
      <p className="desc text-center">
        For the current world, TriggerPrompts is an open-source AI prompting
        application that allows users to find, develop, and share original
        prompts.
      </p>
      <Triggers />
    </div>
  );
}
