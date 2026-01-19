import ProjectForm from '@/components/Projects/ProjectForm';

export default function AdminNewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add New Project</h1>
        <p className="text-muted-foreground">
          Create a new project for the portfolio (Admin)
        </p>
      </div>
      
      <ProjectForm />
    </div>
  );
}