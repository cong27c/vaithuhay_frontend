import Accordion from "~/components/Accordion/Accordion";
import AccordionItem from "~/components/Accordion/AccordionItem";
import Tabs, { Tab } from "~/components/Tabs";
import styles from "./PartTimeJobs.module.scss";
import Form, { TextInput } from "~/components/Forms";
import loginSchema from "~/schema/loginSchema ";

function PartTimeJobs() {
  return (
    <div className={styles.wrapper}>
      <Tabs defaultIndex={2} onChange={(index) => console.log(index)}>
        <Tab title="Tab 1">Content of Tab 1</Tab>
        <Tab title="Tab 2">Content of Tab 2</Tab>
        <Tab title="Tab 3">Content of Tab 3</Tab>
        <Tab title="Tab 4">Content of Tab 4</Tab>
        <Tab title="Tab 5">Content of Tab 5</Tab>
      </Tabs>
      <br />
      <Accordion
        defaultIndex={0}
        onChange={(index) => console.log(index)}
        collapseOthers={true}
      >
        <AccordionItem header="Accordion 1">Accordion 1</AccordionItem>
        <AccordionItem header="Accordion 2">Accordion 2</AccordionItem>
        <AccordionItem header="Accordion 3">Accordion 3</AccordionItem>
      </Accordion>
      <br />
      <Form
        schema={loginSchema}
        defaultValues={{
          email: "",
          password: "",
        }}
      >
        <TextInput name="email" />
        <TextInput name="password" />
        <button>login</button>
      </Form>
    </div>
  );
}

export default PartTimeJobs;
